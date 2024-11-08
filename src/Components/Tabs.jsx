import { useTabs } from '@/context/TabContext'
import React from 'react'

const Tabs = () => {

  const {activeTab, setActiveTab} = useTabs();

  return (
    
<div className="border-b border-gray-200 dark:border-gray-700">
  <ul className="flex flex-wrap md:flex-row *:flex-col -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
    <li className="me-2">
      <button onClick={() => {activeTab !== "Profile" && setActiveTab("Profile")}} className={` ${activeTab === "Profile" && 'active: dark:text-white text-white dark:border-white-500 border-b-2  border-white group'} inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 text-black dark:text-black`} aria-current="page" >
        <svg className={`w-4 h-4 me-2 ${activeTab ==="Profile" && " text-pink-600 dark:text-pink-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>Profile
      </button>
    </li>
    <li className="me-2">
      <button onClick={() => {activeTab !== "Stories" && setActiveTab("Stories")}} className={`${activeTab === "Stories" && 'active: dark:text-white dark:border-white-500 group text-white border-b-2'} inline-flex items-center justify-center p-4 hover:border-b-2 group text-black dark:text-black`} aria-current="page">
        <svg className={`w-4 h-4 me-2 ${activeTab ==="Stories" && " text-pink-600 dark:text-pink-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
        </svg>Stories
      </button>
    </li>
    <li className="me-2">
      <button onClick={() => {activeTab !== "Highlights" && setActiveTab("Highlights")}} className={` ${activeTab === "Highlights" && 'active: dark:text-white dark:border-white-500 text-white group border-b-2 border-white-500'} inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 text-black dark:text-black`}>
        <svg className={`w-4 h-4 me-2 ${activeTab ==="Highlights" && "text-pink-600 dark:text-pink-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
        </svg>Hightlights
      </button>
    </li>
  </ul>
</div>

  )
}

export default Tabs