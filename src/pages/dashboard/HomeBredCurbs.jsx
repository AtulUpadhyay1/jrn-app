import Icon from "@/components/ui/Icon";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React, { useState } from "react";
import { DateRangePicker, Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import Select from "@/components/ui/Select";



const HomeBredCurbs = ({ title }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(11)),
    key: "selection",
  });

  const singleSelect = (date) => {
    setSelectedDate(date);
    console.log(date);
  };
  const handleSelect = (ranges) => {
    setSelectionRange({
      ...selectionRange,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  const options = [
    {
      value: "7days",
      label: "7 Days",
    },
    {
      value: "14days",
      label: "14 Days",
    },
    {
      value: "30days",
      label: "30 Days",
    },
  ];

  const [value, setValue] = useState("7days");

    const handleChange = (e) => {
      setValue(e.target.value);
    };

  return (
    <div className="flex justify-between flex-wrap items-center gap-6 mb-6">
      <h4 className="font-medium lg:text-xl text-l capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
        {title}
      </h4>
      <div className="flex sm:space-x-4 space-x-2 sm:justify-end items-center rtl:space-x-reverse">
        {/* <Popover>
          <PopoverButton className="flex items-center gap-1.5 text-sm/relaxed text-slate-900 bg-white dark:bg-slate-800 dark:text-white px-7 py-2.5 w-full rounded focus:outline-none">
            <Icon icon="heroicons-outline:calendar" />
            <span>Weekly</span>
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="bg-white dark:bg-slate-800 shadow-lg rounded-lg px-3 mt-3"
          >
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
          </PopoverPanel>
        </Popover> */}

      <Select
                label=""
                options={options}
                onChange={handleChange}
                value={value}
                horizontal
                placeholder="Select Your Counrty"
              />

        {/* <Popover>
          <PopoverButton className="flex items-center gap-1.5 text-sm/relaxed text-slate-900 bg-white dark:bg-slate-800 dark:text-white px-7 py-2.5 w-full rounded focus:outline-none">
            <Icon icon="heroicons-outline:filter" />
            <span>Select Date</span>
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="bg-white dark:bg-slate-800  shadow-lg rounded-lg px-3 mt-3"
          >
            <Calendar date={selectedDate} onChange={singleSelect} />
          </PopoverPanel>
        </Popover> */}
      </div>
    </div>
  );
};

export default HomeBredCurbs;
