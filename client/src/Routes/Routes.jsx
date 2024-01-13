import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Home from "../Layout/Home/Home";
import NavBar from "../Layout/NavBar/NavBar";
import Add from "../Layout/Add/Add";
import Edit from "../Layout/Edit/Edit";
import useAuth from "./../hooks/useAuth";
import Public from "../Layout/Public/Public";

const globalState = {
  token: "",
};
export const globalStateContext = React.createContext(globalState);


const Routes = (props) => {
  // const count = useSelector((state) => state.token)
  // const dispatch = useDispatch()
  const [isLogin, token] = useAuth();
  globalState.token = token
  // dispatch(setAuth(token))
  return isLogin ?(
    <globalStateContext.Provider value={globalState}>
    <Fragment>
        <NavBar />
        <Switch>
        <Route path="/" component={ Home } exact />
          <Route path="/add" component={ Add } exact />
          <Route path="/edit" component={ Edit } {...props} exact />
        </Switch>
      </Fragment>
      </globalStateContext.Provider>
  ): <Public />;
};

export default Routes;



