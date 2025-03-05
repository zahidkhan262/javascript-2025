
https://strapi.unicorncurrencies.com/api/landing-banner?populate=*
import React, { useState, useCallback } from "react";
import { Camera, Edit } from "lucide-react";
import Cropper from "react-easy-crop";
import CustomModal from "../modal/custom-modal";

const getCroppedImg = async (imageSrc, croppedAreaPixels, zoom, rotation) => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    -croppedAreaPixels.width / 2,
    -croppedAreaPixels.height / 2,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, "image/jpeg");
  });
};


const ProfileImageUploader = ({ onClose ,setProfileImage,profileImage,preview, setPreview}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // ✅ Store crop area

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
console.log("profileImage",profileImage)
  // Store Cropped Area
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Handle Crop & Save
  const handleCropComplete = async () => {
    if (!profileImage || !croppedAreaPixels) return; // ✅ Ensure valid crop data

    const croppedImage = await getCroppedImg(
      profileImage,
      croppedAreaPixels,
      zoom,
      rotation
    );
    console.log(croppedImage,"croppedImage")
    setPreview(croppedImage);
  setProfileImage(null); 
    onClose();
  };

  const openModal = (image = null) => {
    if (image) {
      setProfileImage(image); // Open modal with existing cropped image
    }
    
  };

  return (
    <div className="flex flex-col items-center">
      {!profileImage ? (
        <label className="relative cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center overflow-hidden relative">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="text-gray-500 text-3xl" />
            )}
          </div>
        </label>
      ) : (
        ""
      )}
       {preview && (
        <button
          onClick={() => openModal(preview)}
          className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-lg hover:bg-gray-100"
        >
          <Edit className="text-gray-600" size={20} />
        </button>
      )}

      {profileImage && (
        <>
          <div className="relative w-full h-[300px] bg-gray-100">
            <Cropper
              image={profileImage}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete} // ✅ Fix
            />
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium">Zoom</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-48 accent-blue-600"
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-sm font-medium">Rotate</label>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-48 accent-blue-600"
              />
            </div>
          </div>
        </>
      )}
      <div className="flex justify-between items-center w-full mt-5">
        <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white">cancel</button>
        <button className="px-4 py-2 bg-purple-400 text-white" onClick={handleCropComplete}>Done & Save</button>
      </div>
    </div>
  );
};

export default ProfileImageUploader;

<div className="flex justify-center">
            <div
              onClick={handleOpenProfile}
              className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center overflow-hidden relative"
            >
              {preview ? <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" /> :
              <Camera className="text-gray-500 text-3xl" />
              }
            </div>
          </div>


"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BoxIcon, GitBranchIcon, CodepenIcon, DatabaseIcon, BeanIcon, DribbbleIcon, Redo2Icon, WindIcon, TypeIcon, MailIcon, LinkedinIcon, ZapIcon, GitGraphIcon, ArrowRightIcon } from 'lucide-react'


const columns = [
  { label: "ID", accessor: "id" },
  { label: "Name", accessor: "name" },
  { label: "Age", accessor: "age" },
];

// Sample data
const data = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 28 },
];

import React, { useState } from "react";

// Define column and data types
interface Column {
  label: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sorting function
  const handleSort = (column: string) => {
    const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);
  };

  // Apply sorting
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Apply search filtering
  const filteredData = sortedData.filter((row) =>
    columns.some((col) =>
      row[col.accessor]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto p-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  onClick={() => handleSort(col.accessor)}
                  className="p-3 text-left cursor-pointer"
                >
                  {col.label}{" "}
                  {sortColumn === col.accessor ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                {columns.map((col) => (
                  <td key={col.accessor} className="p-3">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;




export default function TechFlowDiagram() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="relative bg-gray-950 p-8 rounded-xl">
        {/* Left Section - List Building & Enrichment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-emerald-900/20 p-6 rounded-lg border border-emerald-500/20">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">List Building & Enrichment</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: DribbbleIcon, name: "React" },
                  { icon: TypeIcon, name: "TypeScript" },
                  { icon: CodepenIcon, name: "JavaScript" },
                  { icon: BeanIcon, name: "Node.js" },
                  { icon: DatabaseIcon, name: "MongoDB" },
                  { icon: GitBranchIcon, name: "Git" }
                ].map((tech, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-3 bg-emerald-950/50 rounded-lg">
                    <tech.icon className="w-8 h-8 text-emerald-400 mb-2" />
                    <span className="text-xs text-emerald-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-orange-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-white p-6 rounded-full">
                <h2 className="text-2xl font-bold text-gray-900">RepliQ</h2>
              </div>
            </div>
          </div>

          {/* Right Section - Outbound Sending Software */}
          <div className="md:col-start-2">
            <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-500/20">
              <h3 className="text-xl font-semibold text-orange-400 mb-4">Outbound Sending Software</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: WindIcon, name: "Tailwind" },
                  { icon: BoxIcon, name: "shadcn/ui" },
                  { icon: GitGraphIcon, name: "GraphQL" },
                  { icon: Redo2Icon, name: "Redux" },
                  { icon: MailIcon, name: "Email" },
                  { icon: LinkedinIcon, name: "LinkedIn" }
                ].map((tech, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-3 bg-orange-950/50 rounded-lg">
                    <tech.icon className="w-8 h-8 text-orange-400 mb-2" />
                    <span className="text-xs text-orange-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connection Lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 flex items-center justify-center pointer-events-none">
          <div className="flex gap-2">
            <ArrowRightIcon className="w-6 h-6 text-emerald-400" />
            <ArrowRightIcon className="w-6 h-6 text-orange-400" />
          </div>
        </div>

        {/* AI Personalization Box */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-indigo-900/20 px-4 py-2 rounded-lg border border-indigo-500/20">
            <h4 className="text-sm font-medium text-indigo-400">AI Personalization At Scale</h4>
            <p className="text-xs text-indigo-300">Videos, Sales Pages, Images & Email Writer</p>
          </div>
        </div>
      </div>
    </div>
  )
}


<div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <TechFlowDiagram />
    </div>



// work flow'

import { Check } from 'lucide-react'
import { Card } from "@/components/ui/card"

interface WorkExperienceProps {
  company: string
  location: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  role: string
  description?: string
}

interface TimelineItemProps {
  experience: WorkExperienceProps
}

function TimelineItem({ experience }: TimelineItemProps) {
  const { company, location, startDate, endDate, isCurrent, role, description } = experience
  
  return (
    <div className="relative flex gap-4 pb-12 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[15px] top-[30px] h-full w-[2px] bg-gray-200 last:hidden" />
      
      {/* Status indicator */}
      <div className="relative z-10">
        {isCurrent ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <Check className="h-5 w-5 text-green-600" />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
            <div className="h-3 w-3 rounded-full bg-gray-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <Card className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{company}</h3>
              <p className="text-sm text-gray-600">{location}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                {startDate}
                {endDate ? ` - ${endDate}` : ' - Present'}
              </p>
              {isCurrent && (
                <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                  Current
                </span>
              )}
            </div>
          </div>
          <div className="mt-2">
            <p className="font-medium">{role}</p>
            {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
          </div>
        </Card>
      </div>
    </div>
  )
}

export function WorkTimeline() {
  const experiences: WorkExperienceProps[] = [
    {
      company: "Pinelabs",
      location: "Noida",
      startDate: "Jan 2024",
      role: "Software Engineer",
      isCurrent: true,
      description: "Working on frontend development using React and Next.js"
    },
    {
      company: "Chetu India",
      location: "Noida",
      startDate: "Jan 2022",
      endDate: "Dec 2023",
      role: "Software Engineer",
      description: "Worked on various client projects using React and related technologies"
    }
  ]

  return (
    <div className="max-w-2xl p-6">
      <h2 className="mb-8 text-2xl font-bold">Work Experience</h2>
      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <TimelineItem key={index} experience={exp} />
        ))}
      </div>
    </div>
  )
}


// sidebar

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Home, Compass, Subscriptions, Library, History, Settings, HelpCircle } from "lucide-react";
import { menuItems } from "./data";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmenuToggle = (id) => {
    setOpenSubmenuId(openSubmenuId === id ? null : id);
  };

  const getIcon = (title) => {
    switch (title) {
      case "Home":
        return <Home className="mr-2" />;
      case "Explore":
        return <Compass className="mr-2" />;
      case "Subscriptions":
        return <Subscriptions className="mr-2" />;
      case "Library":
        return <Library className="mr-2" />;
      case "History":
        return <History className="mr-2" />;
      case "Settings":
        return <Settings className="mr-2" />;
      case "Help":
        return <HelpCircle className="mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col bg-gray-900 text-white h-screen w-${isExpanded ? "64" : "20"} transition-width duration-300`}>
      <div className="p-4">
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="p-4 hover:bg-gray-700">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => item.type === "submenu" && handleSubmenuToggle(item.id)}
              >
                <div className="flex items-center">
                  {getIcon(item.title)}
                  {isExpanded && item.title}
                </div>
                {item.type === "submenu" && isExpanded && (
                  <span>{openSubmenuId === item.id ? <ChevronUp /> : <ChevronDown />}</span>
                )}
              </div>
              {item.type === "submenu" && openSubmenuId === item.id && isExpanded && (
                <ul className="pl-6 mt-2">
                  {item.submenu.map((subItem) => (
                    <li key={subItem.id} className="p-2 hover:bg-gray-600">
                      <a href={subItem.path} className="flex items-center">
                        {subItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;


// data.js
export const menuItems = [
  {
    id: 1,
    title: "Home",
    path: "/",
    type: "link",
  },
  {
    id: 2,
    title: "Explore",
    path: "/explore",
    type: "link",
  },
  {
    id: 3,
    title: "Subscriptions",
    path: "/subscriptions",
    type: "link",
  },
  {
    id: 4,
    title: "Library",
    path: "/library",
    type: "link",
  },
  {
    id: 5,
    title: "History",
    path: "/history",
    type: "link",
  },
  {
    id: 6,
    title: "Settings",
    path: "/settings",
    type: "submenu",
    submenu: [
      {
        id: 61,
        title: "Account",
        path: "/settings/account",
        type: "link",
      },
      {
        id: 62,
        title: "Privacy",
        path: "/settings/privacy",
        type: "link",
      },
      {
        id: 63,
        title: "Notifications",
        path: "/settings/notifications",
        type: "link",
      },
    ],
  },
  {
    id: 7,
    title: "Help",
    path: "/help",
    type: "submenu",
    submenu: [
      {
        id: 71,
        title: "FAQ",
        path: "/help/faq",
        type: "link",
      },
      {
        id: 72,
        title: "Contact Us",
        path: "/help/contact",
        type: "link",
      },
    ],
  },
];


