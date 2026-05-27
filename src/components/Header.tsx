import apppangLogo from '@/assets/apppang-logo.png'

function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center bg-white px-3">
      <div>
        <img src={apppangLogo} alt="앱팡" className=" h-8 object-contain" />
      </div>
    </header>
  )
}

export default Header
