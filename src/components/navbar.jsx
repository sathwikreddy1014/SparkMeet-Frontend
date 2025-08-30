
const Navbar = () => {
  return (
    <div className="navbar bg-base-300 shadow-lg justify-between px-4">
      {/* Left: Logo + Name */}
      <div className="flex items-center gap-2">
        <img
          src="/logo.jpg"
          alt="logo"
          className="w-10 h-10 rounded-full shadow-lg"
        />
        <span className="text-xl font-bold">Spark Meet</span>
      </div>

      {/* Right: Avatar Dropdown */}
      <div className="dropdown dropdown-end mx-8">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full ">
            <img
              alt="Profile Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar