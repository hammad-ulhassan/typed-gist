import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editGist } from "../../api/gists";
import GistCreationForm from "../../components/GistCreationForm/GistCreationForm";
import { EditGistContext } from "../../contexts/editGistContext/provider";
import { SETSELECTEDGISTDATA, SETGISTDATAFOREDIT, SETEDITDATAFORPOST } from "../../globals/constants/actionTypes";
import { SELECTED_GIST } from "../../globals/constants/localStorageAccessors";
import { HomePageLayout, CFSWrapper } from "../../shared/components/styledComponent";
import transformGistForEdit from "../../shared/utils/transformGistForEdit";
import transformGistFormDataForPost from "../../shared/utils/transformGistFormDataForPost";

const EditGist = () => {
    // const formRef = useRef(null);
    const navigate = useNavigate();
    const { state, dispatch } = useContext(EditGistContext);
  
    useEffect(() => {
      if (!state.gistData) {
        const myGist = localStorage.getItem(SELECTED_GIST);
        if (myGist) {
          var parsed = JSON.parse(myGist);
          dispatch({
            type: SETSELECTEDGISTDATA,
            payload: parsed,
          });
        }
      }
    }, [dispatch, state.gistData]);
  
    useEffect(() => {
      if(state.gistData){
        var transformed = transformGistForEdit(state.gistData);
        dispatch({
          type:SETGISTDATAFOREDIT,
          payload: transformed
        })
      }
    }, [state.gistData]);
  
    function handleSubmitForm(values: any){
      if(values){
        var transformedForEdit = transformGistFormDataForPost(values);
        dispatch({
          type: SETEDITDATAFORPOST,
          payload: transformedForEdit
        });
        editGist(state.gistData?.id, state.dataForPost).then(e=>{
          navigate('/me')
        })
      }
    }
  
  
    return (
      <HomePageLayout>
        <CFSWrapper>
          <h2>Edit Gist</h2>
        </CFSWrapper>
        <GistCreationForm
          // description={description}
          // files={files}
          onSubmitForm={handleSubmitForm}
        />
      </HomePageLayout>
    );
  };
  
  export default EditGist;