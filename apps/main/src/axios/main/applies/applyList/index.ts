import request from "../..";

export interface getApplyListProps {
  appliesId: string;
  applier: {
    email: string;
    name: string;
  };
  noticeId: string;
  status: "WAITING" | "APPROVE" | "REJECT";
  resumeList: [
    {
      fileId: string;
      fileUrl: string;
      fileType: "IMAGE" | "DOCS" | "UNKNOWN";
      extension: string;
      fileName: string;
    }
  ];
}

export const getApplyList = async ({
  number,
  id,
  status,
}: {
  number: string;
  id: string;
  status: "WAITING" | "APPROVE" | "REJECT";
}) => {
  const data: getApplyListProps = await request({
    method: "get",
    url: `/applies/${number}/${id}`,
    params: {
      status: status,
    },
  });

  return data;
};
