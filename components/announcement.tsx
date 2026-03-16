export function Announcement({ text }: { text: string }) {
  return (
    <div className="w-full text-center py-2 text-sm bg-yellow-500/10 text-yellow-400 border-b border-yellow-500/20">
      {text}
    </div>
  )
}
