import { useCallback, useContext, useState, useEffect } from "react";
import BtnGrp from "../../components/BtnGrp/BtnGrp";
import Datatable from "../../components/Datatable/Datatable";
import {
  CFEWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";

// import { usePublicGists } from "../../hooks/usePublicGistsContext";
import {
  SETPAGE,
  SETPAGESIZE,
} from "../../globals/constants/actionTypes";
import fetchPublicGists from "../../contexts/publicGistsContext/getPublicGists";
import { PublicGistsContext } from "../../contexts/publicGistsContext/provider";

export default function Homepage() {
  const [view, setView] = useState("table");
  const {state, publicGistDispatch} = useContext(PublicGistsContext);

  const viewChange = useCallback((view: string) => {
    setView(view);
  }, []);

  const onPageChange = useCallback(
    ([page, pageSize]:[number, number]) => {
      if (page) {
        publicGistDispatch({ type: SETPAGE, payload: page });
      }
      if (pageSize) {
        publicGistDispatch({ type: SETPAGESIZE, payload: pageSize });
      }
    },
    [publicGistDispatch]
  );

  useEffect(() => {
    fetchPublicGists(state)(publicGistDispatch);
  }, [state.page, state.pageSize]);

  return (
    <HomePageLayout>
      <CFEWrapper>
        <BtnGrp onViewChange={viewChange} view={view} />
      </CFEWrapper>
      <div>
        {view === "table" ? (
          <Datatable
            data={state.gists}
            loading={state.loading}
            onPageChange={onPageChange}
          />
        ) : (
          <></>
        )}
      </div>
    </HomePageLayout>
  );
}
