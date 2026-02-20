import React from 'react'

const Footer = () => {
  return (
    <div id='footer' className='w-full py-3'>
      <ul className='flex items-center justify-center gap-10 text-md font-mono'>
        <li>Made with ❤️ by Ruturaj Nikam</li>
        <li><a href="https://github.com/ruturaj1010" target='_blank'>Github</a></li>
        <li><a href="https://github.com/ruturaj1010" target='_blank'>X</a></li>
        <li><a href="https://github.com/ruturaj1010" target='_blank'>leetcode</a></li>
        <li>&copy; {new Date().getFullYear()}</li>
      </ul>
    </div>
  )
}

export default Footer