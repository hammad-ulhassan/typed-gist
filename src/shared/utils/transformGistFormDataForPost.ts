export default function transformGistFormDataForPost(values: any) {
  let fileContentMap = new Map();
  values?.files?.forEach((file: any) =>
    fileContentMap.set(file.filename, { content: file.content })
  );
  const gistPostData = {
    description: values?.description,
    public: true,
    files: Object.fromEntries(fileContentMap),
  };
  return gistPostData;
}
