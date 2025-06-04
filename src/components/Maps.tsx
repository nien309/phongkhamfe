// components/Maps.tsx
import React from 'react';

const Maps = () => {
  return (
    <div className="map-container my-8">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9595209321237!2d106.67550177420877!3d10.737603289408767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fad141cc503%3A0x588cd490c8ebd678!2zMTgwIENhbyBM4buXLCBQaMaw4budbmcgNCwgUXXhuq1uIDgsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2sus!4v1749012808106!5m2!1svi!2sus"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map - Địa chỉ cửa hàng"
      ></iframe>
    </div>
  );
};

export default Maps;