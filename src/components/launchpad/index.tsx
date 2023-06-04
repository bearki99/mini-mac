import React, { useState } from "react";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLaunchpadStore } from "@/store";
import launchpadApps from "./apps";
import githubImage from "@/public/img/ui/github.jpg";

const Launchpad: React.FC = () => {
  const show = useLaunchpadStore((s) => s.show);
  const setShow = useLaunchpadStore((s) => s.setShow);
  const [focus, setFocus] = useState(false);
  const [searchText, setSearchText] = useState("");

  const search = () => {
    if (searchText === "") return launchpadApps;
    const text = searchText.toLowerCase();
    const list = launchpadApps.filter((item) => {
      return (
        item.title.toLowerCase().includes(text) ||
        item.id.toLowerCase().includes(text)
      );
    });
    return list;
  };

  const close = show ? "" : "opacity-0 invisible";

  const justifySelf = (index: number) => {
    return search().length - index <= search().length % 6
      ? "justify-self-start"
      : "";
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`${close} z-[100] w-full h-full fixed bg-center bg-cover select-none`}
          id="launchpad"
          style={{
            backgroundImage: `url(${githubImage})`,
          }}
          onClick={() => setShow(false)}
          initial={{ opacity: 0, scale: 1.4 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0.2, scale: 1.4 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute w-full h-full bg-gray-900/20 backdrop-blur-2xl">
            {/* Search Input */}
            <div
              className="flex w-64 mx-auto mt-[7vh] border rounded-md h-7  bg-gray-200/10 border-gray-200/30"
              onClick={(e) => e.stopPropagation()}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            >
              <div
                className={`${
                  focus ? "w-6 duration-200" : "w-26 delay-250"
                } flex items-center justify-end `}
              >
                <span className="ml-1 text-white">
                  <Search size={16} />
                </span>
              </div>
              <input
                className="flex-1 min-w-0 px-1 text-sm text-white bg-transparent outline-none"
                placeholder={"Search"}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </div>

            {/* Apps */}

            <div className="flex w-full h-full overflow-y-hidden">
              <div className={"h-full w-[13vw] mr-auto"} />
              <div
                className={
                  "flex w-full flex-wrap content-start justify-items-center mt-3 h-full"
                }
              >
                {search().map((app, index) => (
                  <div
                    key={`launchpad-${app.id + index}`}
                    className={`flex-center flex-col ${justifySelf(
                      index
                    )} w-[13vw] h-[20vh]`}
                  >
                    <a href={app.link}>
                      <img
                        src={app.img}
                        width={80}
                        height={80}
                        alt={app.title}
                      />
                    </a>
                    <p>{app.title}</p>
                  </div>
                ))}
              </div>
              <div className={"h-full w-[11vw] ml-auto"} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Launchpad;
