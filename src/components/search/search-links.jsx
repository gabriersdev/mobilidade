import {Link} from "react-router-dom";
import {Badge} from "react-bootstrap";

const SearchLinks = () => {
  return (
    <div className={"py-3 d-flex align-items-center gap-1 overflow-x-scroll"}>
      {
        [
          ["Municipal", "bg-danger-subtle text-danger-emphasis"],
          ["Metropolitano", "bg-primary-subtle text-primary-emphasis"],
          // ["Intermunicipal", "bg-primary-subtle text-primary-emphasis"],
          // ["Coletivo", "bg-danger-subtle text-danger-emphasis"],
          ["Executivo", "bg-success-subtle text-success-emphasis"],
        ].toSorted((a, b) =>
          (a[1] ? 1 : 0) - (b[1] ? 1 : 0) || (a[1] ? a[1].localeCompare(b[1]) : a[0].localeCompare(b[0]))
        ).map((item, index) => (
          <Link key={index} to={(typeof item[0]!== "string" ? item[0].toString().match(/\d/g) : item[0].match(/\d/g)) ? ((item[0].toString().match(/\d/g).join('').length === item[0].toString().length) ? "/search/?term=" + item[0] : "/search/?term=" + item[0].toLowerCase()) : "/search/?term=" + item[0].toLowerCase()} className={"cursor-pointer"}>
            <Badge key={index} className={"rounded-pill fw-normal d-inline-block inter fs-6 " + (item[1] ? item[1] : "bg-secondary-subtle text-secondary-emphasis")}>{item[0]}</Badge>
          </Link>
        ))
      }
      <span className={"text-body-tertiary fw-light"}>|</span>
      {
        [...["Pompeu", "Morada da Serra", "Paciência", 4993, 4991, 4988, 4987, 4970, 4925, 4920, 4900, 4676, 4600].map(i => [i])].map((item, index) => (
          <Link key={index} to={(item[0].toString().match(/\d/g)) ? ((item[0].toString().match(/\d/g).join('').length === item[0].toString().length) ? "/search/?term=" + item[0] : "/search/?term=" + item[0].toLowerCase()) : "/search/?term=" + item[0].toLowerCase()} className={"cursor-pointer"}>
            <Badge className={"rounded-pill fw-normal d-inline-block inter fs-6 " + (item[1] ? item[1] : "bg-primary-subtle text-primary-emphasis")}>{item[0]}</Badge>
          </Link>
        ))
      }
    </div>
  )
}

export default SearchLinks
