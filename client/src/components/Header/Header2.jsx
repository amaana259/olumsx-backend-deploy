import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react'
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CodeBracketIcon,
  ShoppingBagIcon,
  HomeIcon,
  SparklesIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  LifebuoyIcon,
  CakeIcon,
  MagnifyingGlassIcon

} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const categories = [
  { name: 'Mobile Phones', href: '/categorysearch/mobilephones', icon: DevicePhoneMobileIcon },
  { name: 'Laptops and Computers', href: '/categorysearch/laptopsandcomputers', icon: ComputerDesktopIcon },
  { name: 'Tech Accessories', href: '/categorysearch/techaccessories', icon: CodeBracketIcon },
  { name: 'Fashion', href: '/categorysearch/fashion', icon: ShoppingBagIcon },
  { name: 'Home and Decor', href: '/categorysearch/homeanddecor', icon: HomeIcon },
  { name: 'Beauty and Health', href: '/categorysearch/beautyandhealth', icon: SparklesIcon },
  { name: 'Books', href: '/categorysearch/books', icon: BookOpenIcon },
  { name: 'Toys and Games', href: '/categorysearch/toysandgames', icon: PuzzlePieceIcon },
  { name: 'Sports and Outdoors', href: '/categorysearch/sportsandoutdoors', icon: LifebuoyIcon },
  { name: 'Food and Grocery', href: '/categorysearch/foodandgrocery', icon: CakeIcon },
];


export default function Header2() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {

    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    } else {
      console.log('Please enter a search term.');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex justify-between items-center px-4 py-2">
      {/* Categories List */}
      <Popover className="relative">
        <Popover.Button className="flex items-center gap-x-1 text-md font-semibold leading-6 text-white focus:outline-none">
          Categories
          <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-72 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
            <div className="p-3">
              {categories.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex items-center gap-x-4 rounded-lg p-1 text-sm leading-6 hover:bg-gray-50"
                >
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div className="flex-auto">
                    <a href={item.href} className="block font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-full border-2 border-gray-200 w-2/3 sm:w-4/5">
        <input
          type="text"
          className="w-full rounded-full rounded-r-none py-2.5 px-4 text-gray-700 leading-tight focus:outline-none"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleSearch}
        >
          <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}