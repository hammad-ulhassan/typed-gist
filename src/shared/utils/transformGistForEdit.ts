export type transformedType = {
    description: string;
    files: {
        filename: string;
        content: string;
    }[]
}

export default function transformGistForEdit(gistAllData: any){
    var transformed: transformedType = { description: "", files: [] };
    transformed.description = gistAllData.description;
    Object.keys(gistAllData.files).forEach((file: any) =>
      transformed.files.push({
        filename: file,
        content: gistAllData.files[file].content,
      })
    );
    return transformed;
}