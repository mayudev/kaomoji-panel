type Props = {
  groupNames: Array<string>;
};

function Navigation(props: Props) {
  return (
    <nav className="Navigation">
      {props.groupNames.map((group) => (
        <a href={"#" + group} key={group} className="Link">
          {group}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;
