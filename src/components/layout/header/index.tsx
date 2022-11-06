import React from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { AntdLayout, Typography, Avatar, Space } from "@pankod/refine-antd";

const { Text } = Typography;

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity();

  const shouldRenderHeader = user && (user.username || user.avatar);

  return shouldRenderHeader ? (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        backgroundColor: "#FFF",
      }}
    >
      <Space>
        {user.username && (
          <>
            <Text ellipsis strong>
              {user.username}
            </Text>
            <Avatar size="large" src={`https://ui-avatars.com/api/?name=` + user.username} />
          </>
        )}
        {/* {user.avatar && (
          <Avatar size="large" src={user?.avatar} alt={user?.name} />
        )} */}
      </Space>
    </AntdLayout.Header>
  ) : null;
};
