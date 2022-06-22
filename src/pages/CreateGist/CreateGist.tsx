import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGist } from "../../api/gists";
import GistCreationForm from "../../components/GistCreationForm/GistCreationForm";
import {
  CFSWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";
import transformGistFormDataForPost from "../../shared/utils/transformGistFormDataForPost";

const CreateGist = () => {
  const [values, setValues] = useState({});
  const navigate = useNavigate();

  const onCreateGist = useCallback((data: any) => {
    setValues(data);
  }, []);

  useEffect(() => {
    if (Object.keys(values).length !== 0) {
      let gistPostData = transformGistFormDataForPost(values);
      createGist(gistPostData).then((e) => {
        message.success("Gist Created Successfully");
        return e
      }).then(e=>{
        navigate("/home");
      }).catch(err=>{
        message.error("there was a problem in creating gist");
      });
    }
  }, [navigate, values]);

  return (
    <HomePageLayout>
      <CFSWrapper>
        <h2>Create Gist</h2>
      </CFSWrapper>
      <GistCreationForm onSubmitForm={onCreateGist} />
    </HomePageLayout>
  );
};

export default CreateGist;
