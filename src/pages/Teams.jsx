import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { earningData } from '../data/dummy';
import { GrFormAdd } from 'react-icons/gr';
import { useStateContext } from '../contexts/ContextProvider';


const Teams = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="fixed right-4 top-12" style={{ zIndex: '1000' }}>
        <button
          type="button"
          onClick={openModal}
          style={{ background: currentColor }}
          className="text-base text-white p-2 hover:drop-shadow-xl hover:bg-light-gray rounded-full opacity-0.9"
        >
          Add / Join Team
        </button>
      </div>

      {/* Modal */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
            </Transition.Child>

            {/* Modal Content */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {/* Form Content */}
                <form>
                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">Event Name:</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter event name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">Organization:</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option value="">Select organization</option>
                      <option value="CS Society">CS Society</option>
                      {/* Add your organization options here */}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">Venue:</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option value="">Select venue</option>
                      <option value="ELL">ELL</option>
                        <option value="CS Lounge">CS Lounge</option>
                        <option value="FYP Lab">FYP Lab</option>
                        <option value="Dewan Tengku Syed Putra">Dewan Tengku Syed Putra</option>
                        <option value="Dewan Utama Pelajar">Dewan Utama Pelajar</option>
                        <option value="Dewan Utama Desasiswa">Dewan Utama Desasiswa</option>
                        <option value="Dewan Budaya">Dewan Budaya</option>
                        <option value="Stadium Azman Hashim">Stadium Azman Hashim</option>
                        <option value="Padang Kawad">Padang Kawad</option>
                        <option value="DKG 31">DKG 31</option>
                        <option value="CS Auditorium">CS Auditorium</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">Event Details:</label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter event details"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block mb-2 font-semibold">Start Date:</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold">Start Time:</label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block mb-2 font-semibold">End Date:</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold">End Time:</label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-white bg-gray-500 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ background: currentColor }}
                      className="ml-2 px-4 py-2 text-white rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex m-14 flex-wrap justify-center gap-7 items-center">
        {earningData.map((item) => (
          <div key={item.title} className="bg-white h-60 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-60 p-4 pt-9 rounded-2xl">
            <div className="flex flex-col justify-center items-center">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-12">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>{item.percentage}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Teams;