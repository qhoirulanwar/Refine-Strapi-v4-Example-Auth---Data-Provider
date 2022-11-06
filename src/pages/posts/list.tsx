import { useState } from "react";
import { CrudFilters, IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
    DateField,
    Space,
    EditButton,
    DeleteButton,
    ImageField,
    Form,
    Radio,
    Tag,
    Input,
    Icons,
    Button,
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

import { API_URL } from "../../constants";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const [locale, setLocale] = useState("en");
    const [publicationState, setPublicationState] = useState("live");

    const { tableProps, sorter, searchFormProps } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
        metaData: {
            populate: ["category", "cover"],
            locale,
            publicationState,
        },
        onSearch: (params: any) => {
            const filters: CrudFilters = [];
            // console.log(params.title);

            filters.push({
                field: 'title',
                operator: 'contains',
                value: params.title
            })

            return filters;
        },
    });

    const { selectProps } = useSelect({
        resource: "categories",
        optionLabel: "title",
        optionValue: "id",
        metaData: { locale },
    });

    const flexJustifySpaceStyle = {
        display: 'flex',
        'justify-content': 'space-between',
    };

    return (
        <List>
            <Form
                layout="inline"
                initialValues={{ locale, publicationState, }}
                {...searchFormProps}
                style={flexJustifySpaceStyle}
            >
                <Form.Item label="Locale" name="locale">
                    <Radio.Group onChange={(e) => setLocale(e.target.value)}>
                        <Radio.Button value="en">English</Radio.Button>
                        <Radio.Button value="de">Deutsch</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Publication State" name="publicationState">
                    <Radio.Group onChange={(e) => setPublicationState(e.target.value)} >
                        <Radio.Button value="live">Published</Radio.Button>
                        <Radio.Button value="preview">
                            Draft and Published
                        </Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <div style={flexJustifySpaceStyle}>
                    <Form.Item name="title">
                        <Input
                            placeholder="Title"
                            prefix={<Icons.SearchOutlined />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Search
                        </Button>
                    </Form.Item>
                </div>
            </Form>
            <br />
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    showSizeChanger: true,
                }}
            >
                <Table.Column
                    dataIndex="id"
                    key="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column
                    dataIndex="title"
                    key="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter={{ multiple: 2 }}
                />
                <Table.Column
                    key="[category][id]"
                    dataIndex={["category", "title"]}
                    title="Category"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Category"
                                {...selectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="createdAt"
                    title="Created At"
                    render={(value) => <DateField value={value} format="LLL" />}
                    defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
                    sorter={{ multiple: 1 }}
                />
                <Table.Column
                    dataIndex="publishedAt"
                    title="Status"
                    render={(value) => {
                        return (
                            <Tag color={value ? "green" : "blue"}>
                                {value ? "Published" : "Draft"}
                            </Tag>
                        );
                    }}
                />
                {/* <Table.Column
                    dataIndex={"cover"}
                    align="center"
                    title="Cover"
                    render={(value) => {
                        return value ? (
                            <ImageField
                                value={API_URL + value[0].url}
                                alt={value[0]?.name}
                                title={value[0]?.name}
                                width={48}
                                preview={{ mask: <></> }}
                            />
                        ) : (
                            <span>---</span>
                        );
                    }}
                /> */}
                <Table.Column<{ id: string }>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
