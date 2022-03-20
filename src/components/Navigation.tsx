import { useRef } from "react";
import "../styles/navigation.scss";

type Props = {
  groupNames: Array<string>;
};

function Navigation(props: Props) {
  const navigationRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (navigationRef.current !== null) {
      navigationRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (navigationRef.current !== null) {
      navigationRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="Navigation__container">
      <nav className="Navigation" ref={navigationRef}>
        <div
          className="Navigation__handle Navigation__handle--left"
          onClick={scrollLeft}
        >
          {/* Material Icons arrow_back_ios_new */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="currentColor"
          >
            <rect fill="none" height="24" width="24" />
            <g>
              <polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12" />
            </g>
          </svg>
        </div>
        <div
          className="Navigation__handle Navigation__handle--right"
          onClick={scrollRight}
        >
          {/* Material Icons arrow_forward_ios */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="currentColor"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
            </g>
          </svg>
        </div>
        {props.groupNames.map((group) => (
          <a href={"#" + group} key={group} className="Link">
            {group}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default Navigation;
