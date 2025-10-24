export default function SidebarNav() {
  return (
    <aside className="w-64 border-r bg-gray-50 h-full p-4">
      <div className="text-lg font-semibold mb-4">Supplier Hub</div>
      <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex items-center justify-between">
          <span>Folders</span>
        </li>
        <li>Inbox</li>
        <li>Resolved</li>
        <li>Statements</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
}
