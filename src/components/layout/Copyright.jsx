import React from 'react'

const Copyright = () => {
  return (
    <div className="">
                    <div className="flex md:my-2 flex-col md:flex-row justify-between text-blck w-full">
                        <div  className="mb-2 md:mb-0 truncate">
                        <a href="https://thetradecore.com/privacy-policy/" className="mx-2 text-blck">Privacy Policy</a>
                            <a href="https://thetradecore.com/cookies-policy/" className="mx-2 text-blck">Cookies Policy</a>
                            {/* <a href="https://thetradecore.com/terms-and-conditions/" className="mx-2">Terms & Conditions</a> */}
                        </div>
                        <p className='text-blck truncate' >© Copyright 2024, The Trade Core. All Rights Reserved</p>
                    </div>
                </div>
  )
}

export default Copyright