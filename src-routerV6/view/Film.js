import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Film() {
  return (
    <>
    <div>FilmTitle</div>
    {/* 路由容器 */}
    <Outlet></Outlet>
    </>
  )
}
