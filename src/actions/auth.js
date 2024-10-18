"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify, SignJWT } from "jose";
import { generateToken } from '../utils/functions'
const loginSchema = z.object({
  email: z.string().email("Not a valid email").max(255, "Email too long"),
  password: z.string().min(5, "Password too short"),
});

const cookieConfig = {
  httpOnly: true,
  secure: false,
  maxAge: 60 * 60,
  sameSite: 'Strict',
};


const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
const base_Uri = process.env.NEXT_PUBLIC_BASE_URL;
console.log(JWT_SECRET)
async function loginAPI(cred) {

  const token = await generateToken();
  

  const response = await fetch(`${base_Uri}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
    cache: "no-cache",
    body: JSON.stringify(cred),
  });

  const data = await response.json();

    const res = {
      data: {
        id : data.user.id,
        email : data.user.email,
        name : data.user.name,
        token: data.token,
        roleId: data.user.roleId,
        understand:data.fresh,
        fresh : data.fresh,
        trade : data.user.trade,
        SubscriptionType : data.user.SubscriptionType?.type,
        SubscriptionId : data.user.SubscriptionType?.id,
        SubscriptionLeadCount : data.user.SubscriptionType?.leadCount,
        UsedLeadCount : data.user.leadUsed,
      }
    };
    return res;

}

export async function login(prevState, credentialsFormData) {
  const validated = loginSchema.safeParse({
    email: credentialsFormData.get("email"),
    password: credentialsFormData.get("password"),
  });

  if (!validated.success) {
    return {
      zod_errors: validated.error.flatten().fieldErrors,
    };
  }

  let resp;
  try {
    resp = await loginAPI(validated.data);
  } catch (err) {
    return {

      other: "Invalid credentials",

    };
  }

  if (!resp?.data?.token) {
    return {
      other: "Invalid credentials token",
    };
  }

  // Decode the JWT token
  const { payload } = await jwtVerify(
    resp.data.token,
    new TextEncoder().encode(JWT_SECRET)
  );

  // Add expiry and user role
  const expiry = Math.floor(Date.now() / 1000) + 60 * 60 ; 
  const userRole = resp?.data?.roleId;
  const userEmail = resp?.data?.email;
  const User = resp?.data;

  const updatedToken = await new SignJWT({
    ...payload,
    exp: expiry,
    role: userRole,
    email: userEmail,
    user : User
  })
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(JWT_SECRET));

  cookies().set("user", JSON.stringify(resp.data), cookieConfig);
  cookies().set("jwt", updatedToken, cookieConfig);

  if (userRole === 3) {

    redirect("/dashboard");
  }
}

export async function getUserDetails() {

  const userCookie = cookies().get("user");
  if (!userCookie) {
    return null;
  }
  const userDetails = JSON.parse(userCookie.value);

  return userDetails;
}

export async function logout() {
  cookies().delete("jwt");
  cookies().delete("user");
  redirect("/login");
}