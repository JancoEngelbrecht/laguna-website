import React from 'react';

import BBQSteak from '../../../assets/images/BBQSteak.png';
import BBQ from '../../../assets/images/BBQ.png';
import Smoke from '../../../assets/images/Smoke.png';

const BBQSteakSection = () => {
  return (
    <section>
      <div className="relative flex justify-center items-center pt-12 pb-12 md:pt-24">
        <div className="w-2/4 md:w-1/4 h-auto md:h-auto absolute z-20 bottom-40 md:bottom-72">
          <img src={Smoke} alt="Smoke" />
        </div>
        <div className="w-2/4 md:w-1/4 h-auto md:h-auto absolute z-30 bottom-40 md:bottom-72">
          <img src={Smoke} alt="Smoke" />
        </div>
        <div className="w-2/4 md:w-1/4 h-auto md:h-auto absolute z-40 bottom-40 md:bottom-72">
          <img src={Smoke} alt="Smoke" />
        </div>
        <div className="moveDown w-4/12 md:w-2/12 h-auto md:h-auto absolute z-50">
          <img src={BBQSteak} alt="BBQ Steak" />
        </div>
        <div className="swing w-2/4 md:w-1/4 h-auto md:h-auto relative z-0">
          <img src={BBQ} alt="BBQ" />
        </div>
      </div>
    </section>
  );
};

export default BBQSteakSection;