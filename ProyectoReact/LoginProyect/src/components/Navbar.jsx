import { Link, NavLink } from "react-router-dom"


const NavBar = (props) => {
    return (<>
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                {
                    props.routes.map((elem, index) =>
                    <div className="col-2">
                        <NavLink key={`link-${index}`} to={elem.to} className={ ({ isActive }) => (isActive ? "isActive"  : null)}>
                            {elem.linkText}
                        </NavLink>
                        </div>
                    )
                }

            </nav>
        </div>
        </>
    )
}

export default NavBar