import Footer from "../components/front/Footer";
import Header from "../components/homepage/header/Header";
import SubHeader from "../components/homepage/header/SubHeader";
import Uploader from "../components/upload/uploader";
import withAuth from "../hocs/withAuth";
import {
  getName,
  getRole,
  useIsAuthenticated
} from "../providers/Auth";

export default withAuth(function Import() {
  const isAuthenticated = useIsAuthenticated();
  const name = getName();
  const role = getRole();

  return (
    <div className="flex flex-col h-screen">
      <Header name={name} role={role} />
      <SubHeader name={name} role={role} />

      <div className="antialiased bg-gray-200 flex-grow">
        <Uploader />
      </div>

      <Footer />
    </div>
  );
});
