import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { ContentWrapper } from "../../shared/components/styledComponent";
import "./MainLayout.css";

function MainLayout() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, []);

  return (
    <section id="page">
        <Header />

      <main>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </main>
    </section>
  );
}
export default MainLayout;
