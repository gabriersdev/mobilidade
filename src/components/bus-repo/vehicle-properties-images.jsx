import {vehiclePropertiesImagesSRC} from "@/assets/resources.js";
import {Image} from "react-bootstrap";

export default function VehiclePropertiesImages({vehicle}) {
  if (!vehicle) return null;
  
  const chassisManufacturer = vehicle?.chassis?.manufacturer || "";
  // const chassisModel = vehicle?.chassis?.model || "";
  const bodyworkManufacturer = vehicle?.bodywork?.manufacturer || "";
  // const bodyworkModel = vehicle?.bodywork?.model || "";
  
  const returnIMGSourceIfExists = (term) => {
    const allItems = Object.assign(
      {},
      vehiclePropertiesImagesSRC,
    );
    
    const termSanitized = term.toLowerCase().trim().replace(/\s/g, "-");
    
    let correspondence = Object.keys(allItems).includes(termSanitized);
    if (correspondence) return allItems[termSanitized];
    return null;
  }
  
  return (
    <div className={"d-flex flex-wrap gap-5 align-items-center"}>
      <div className={"d-flex gap-1 flex-column"}>
        {
          returnIMGSourceIfExists(chassisManufacturer) ? (
            <Image
              src={returnIMGSourceIfExists(chassisManufacturer)}
              width={150}
              height={50}
              alt={"Logo da " + chassisManufacturer}
              className={"w-full object-fit-contain object-center"}
            />
          ) : chassisManufacturer
        }
        
        <span className={"bg-warning py-1 w-25 rounded-pill"}></span>
      </div>
      
      <div className={"d-flex gap-0 flex-column"}>
        {
          returnIMGSourceIfExists(bodyworkManufacturer) ? (
            <Image
              src={returnIMGSourceIfExists(bodyworkManufacturer)}
              width={150}
              height={50}
              alt={"Logo da " + bodyworkManufacturer}
              className={"w-full object-fit-contain object-center"}
            />
          ) : bodyworkManufacturer
        }
        
        <span className={"bg-danger py-1 w-25 rounded-pill"}></span>
      </div>
    </div>
  )
}
