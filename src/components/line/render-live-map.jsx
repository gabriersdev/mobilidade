import AsyncIframe from "@/components/async-iframe/async-iframe.tsx";
import liveMap from "../../assets/live-map.js";
import {Link} from "react-router-dom";
import Title from "../ui/title/title.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import Util from "@/assets/Util.jsx";

export default function RenderLiveMap({data}) {
  const lineId = data?.[0]?.line_id;
  const [content, setContent] = useState(<></>);
  
  useEffect(() => {
    if (lineId) {
      const existsLinkLiveMap = Object.entries(liveMap).find(item => item[0] === lineId.toString());
      
      const link = existsLinkLiveMap ? existsLinkLiveMap[1] : null;
      
      if (link) return (
        setContent(
          <section id={"mapa"} className={"pt-3"}>
            <div>
              <Title type="h3" classX={" pb-2 text-body-secondary"}>Mapa ao vivo da <b>linha {data?.[0]?.line_number}</b></Title>
              
              <AsyncIframe
                src={link}
                title="Mapa ao vivo da linha"
              />
              
              <span className={"text-sml d-none"}>
                {Util.renderText(JSON.stringify(link))}
              </span>
              
              <Link
                className={"link-opacity-100 d-flex gap-1 align-items-center mt-2"}
                style={{textDecoration: 'none'}}
                to={"https://editor.mobilibus.com/web/bus2you/1sb79#hf5a"}
                rel={"noreferrer noopener"}
                target={"_blank"}
              >
                <span>Abrir website</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px"
                     fill={"#7BBEFE"}>
                  <path
                    d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                </svg>
              </Link>
            </div>
          </section>
        )
      )
    }
  }, [lineId]);
  
  return content;
}

RenderLiveMap.propTypes = {
  data: PropTypes.array
}
