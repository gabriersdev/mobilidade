import {useEffect, useState} from "react";
import moment from "moment";
import Util from "@/lib/Util.jsx";

const VersionInfo = () => {
  const [version, setVersion] = useState("1.17.0");
  const [cacheVersion, setCacheVersion] = useState("V40");
  const [dataBuild, setDataBuild] = useState({datetimeCreate: null});
  
  useEffect(() => {
    fetch("/register.build.json")
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setDataBuild({...data});
        if (data.version) setVersion(data.version);
        if (data.cacheVersion) setCacheVersion(data.cacheVersion);
      })
      .catch((error) => {
        console.error("Failed to fetch build info:", error);
      });
  }, []);
  
  return (
    <div className={"d-b lock mt-2 text-sml d-flex flex-column gap-1"}>
      <p className={"text-body-secondary p-0 m-0 fs-inherit"}>Versão: {version} | Cache: {cacheVersion} </p>
      <p className={"text-body-secondary p-0 m-0 fs-inherit"}>
        {dataBuild.datetimeCreate && (
          <span>
            Versão de build: {Util.renderText(moment(dataBuild.datetimeCreate).utc(true).format("HH[h]mm[m] DD/MM/YYYY [GMT-03:00]"))}
          </span>
        )}
      </p>
    </div>
  );
};

export default VersionInfo;
