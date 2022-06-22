import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserGists } from "../../api/gists";
import { IGistRecord } from "../../api/types";
import BtnGrp from "../../components/BtnGrp/BtnGrp";
import Datatable from "../../components/Datatable/Datatable";
import { CFEWrapper, HomePageLayout } from "../../shared/components/styledComponent";

const SearchPage = () => {
    const [view, setView] = useState("table");
    const [data, setData] = useState([] as IGistRecord[]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    let [searchParams] = useSearchParams();
  
    const viewChange = useCallback((view: string) => {
      setView(view);
    }, []);
  
    useEffect(() => {
      getUserGists(searchParams.get("user")).then((data) => {
        setData(data);
        setLoading(false);
      });
    }, [searchParams]);
  
    const onPageChange = useCallback((page: number, pageSize: number) => {
      setPage(page);
      setPageSize(pageSize);
    }, []);
  
    return (
      <HomePageLayout>
        <CFEWrapper>
          <BtnGrp onViewChange={viewChange} view={view} />
        </CFEWrapper>
        <div>
          {view === "table" ? (
            <Datatable
              data={data}
              loading={loading}
              onPageChange={onPageChange}
            />
          ) : (
            <></>
          )}
        </div>
      </HomePageLayout>
    );
  };
  
  export default SearchPage;