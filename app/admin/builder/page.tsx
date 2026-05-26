"use client";

import dynamic from 'next/dynamic'

// Đây chính là hành động "IMPORT" (gọi file Builder ở Bước 1 vào đây)
// Dùng kèm dynamic(..., { ssr: false }) để web không bị lỗi trắng trang khi deploy
const ArchaeopterisBuilder = dynamic(
  () => import('@/components/ArchaeopterisBuilder'),
  { ssr: false } 
)

// Xuất cái trang này ra để Next.js nhận diện đường dẫn /admin/builder
export default function AdminBuilderPage() {
  return (
    <div className="w-full h-screen bg-black">
      <ArchaeopterisBuilder />
    </div>
  )
}