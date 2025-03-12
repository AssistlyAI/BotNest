import { BotMessageSquare, Pencil, ScanEye } from "lucide-react";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="bg-white shadow-md p-5 flex flex-col">
      <ul className="gap-5 flex lg:flex-col">
        <li className="flex-1">
          <Link
            href="/admin/create-chatbot"
            className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
          >
            <BotMessageSquare className="h-6 w-6 lg:h-8 lg:w-8" />
            <span className="hidden md:inline">Create New Chatbot</span>
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href="/admin/Edit -chatbots"
            className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
          >
            <Pencil className="h-6 w-6 lg:h-8 lg:w-8" />
            <span className="hidden md:inline">Edit Chatbots</span>
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href="/admin/review-sessions"
            className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
          >
            <ScanEye className="h-6 w-6 lg:h-8 lg:w-8" />
            <span className="hidden md:inline">Review Sessions</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
