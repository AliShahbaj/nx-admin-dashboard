"use client";
import React, { useRef, useState } from "react";
import { BRAND } from "@/types/brand";
import Image from "next/image";
import { toJpeg } from 'html-to-image';
import axios from "axios";
import { SketchPicker } from 'react-color';

const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    visitors: 3.5,
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  }
];

const FrameBox = () => {
  const cardRef = useRef(null);
  const [titleColor, setTitleColor] = useState('#333');
  const [descriptionColor, setDescriptionColor] = useState('#333');
  const [formData, setFormData] = useState({
    title: 'रवि शास्त्री ने कहा',
    description: 'मुझे नहीं लगता पिछले 20 वर्षो में ऑस्ट्रेलिया में किसी अन्य मेहमान खिलाडी ने विराट कोहली से बेहतर प्रदर्शन किया होगा।',
    smallImage: null,
    largeImage: null,
  });

  const handleDownload = () => {
    if (cardRef.current) {
      toJpeg(cardRef.current, { quality: 0.95 })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'card-image.jpeg';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Oops, something went wrong!', err);
        });
    }
  };

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleColorChange = (color: any) => {
    setTitleColor(color.hex); // Update the title color
  };

  const handleColorChangeD = (color: any) => {
    setDescriptionColor(color.hex); // Update the title color
  };


  return (
    <>
      <div className="card-group" style={{display: "flex"}}>
        <div className="card rounded-[10px] bg-white px-3 pb-2 pt-4.5 shadow-1 dark:bg-gray-dark dark:shadow-card m-5" style={{width: "500px"}} ref={cardRef}>
          <div className="card-body">
            <div className="top-bar flex flex-wrap items-center">
            {formData.smallImage && (
              <Image
                width={112}
                height={112}
                src={formData.smallImage}
                alt="User"
                className="overflow-hidden rounded-full"
              />
            )}
              
              <h2
                className="card-title"
                style={{paddingLeft: "20px", fontWeight: "600", color: titleColor}}
                > 
                {formData.title}
              </h2>
            </div>
              <p className="card-text"  style={{paddingLeft: "30px", color: descriptionColor}}>मुझे नहीं लगता पिछले 20 वर्षो में ऑस्ट्रेलिया में किसी अन्य मेहमान खिलाडी ने विराट कोहली से बेहतर प्रदर्शन किया होगा।</p>
          </div>
          {formData.largeImage && (
            <img
              src={formData.largeImage}
              alt="Large Preview"
              className="card-img-top"
              width={400}
              height={400}
            />
          )}
        </div>

        <div className="card bg-white px-3 pb-2 pt-4.5 shadow-1 dark:bg-gray-dark dark:shadow-card m-5" style={{width: "570px"}}>
          <div className="card-body">
            <h1 className="mb-4">Dynamic Form with Preview  <button className="flex  rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90" onClick={handleDownload}>Download</button></h1>
            <div className="row">
              {/* Form */}
              <div className="col-md-6">
                <form>
                  <div className="mb-3">
                    <div style={{display: "flex"}}>
                      <div style={{ marginTop: '20px' }}>
                        <h3>Title Color</h3>
                        <SketchPicker color={titleColor} onChange={handleColorChange} />
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <h3>Description Color</h3>
                        <SketchPicker color={descriptionColor} onChange={handleColorChangeD} />
                      </div>
                    </div>
                    <label htmlFor="title" className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Title</label>
                    <input
                      type="text"
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Description</label>
                    <textarea
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      id="description"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="smallImage" className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Small Image</label>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      id="smallImage"
                      name="smallImage"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="largeImage" className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Large Image</label>
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      id="largeImage"
                      name="largeImage"
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrameBox;
