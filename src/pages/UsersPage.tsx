import Title from 'antd/es/typography/Title';
import { adminBlockUser, adminDeleteUser, adminUnblockUser, adminUsers } from '../api';
import { useCallback, useEffect, useState } from 'react';
import { type Profile, RolesValues, type UserFilters } from '../types';
import {
  Button,
  type CheckboxChangeEvent, Dropdown,
  Flex,
  Form,
  Input, Popconfirm,
  Radio,
  Spin,
  Table,
  type TableProps,
  Tag,
} from 'antd';
import { useNotification } from '../providers/NotificationProvider.tsx';
import type { ColumnsType } from 'antd/es/table';
import {
  DeleteOutlined,
  LockOutlined,
  MoreOutlined,
  SafetyCertificateOutlined,
  UnlockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '../hooks/redux.ts';
import type { RootState } from '../store';
import type { ItemType } from 'antd/es/menu/interface';

const FILTER_DATA: UserFilters = {
  search: undefined,
  sortBy: undefined,
  sortOrder: undefined,
  isBlocked: undefined,
  page: 1,
  limit: 20,
}

function useDebounce(value: string) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}


const UsersPage = () => {
  const {roles}  = useAppSelector((state: RootState) => state.auth);
  const isAdmin = roles.includes(RolesValues.ADMIN);

  const {notificationError} = useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<UserFilters>(FILTER_DATA)

  const [form] = Form.useForm<{ search: string }>();
  const searchValue = Form.useWatch('search', form);
  const debouncedSearch = useDebounce(searchValue);

  const fetchData = useCallback(async (filter: UserFilters) => {
    const {search, sortBy, sortOrder, isBlocked, page, limit} = filter;

    setIsLoading(true);

    try {
      const users = await adminUsers({search, sortBy, sortOrder, isBlocked, page: (page ? page - 1 : 0), limit})
      setUsers(users.data);
      setTotal(users.meta.totalAmount);
    } catch (error) {
      const myError = error as Error;
      notificationError(myError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      await fetchData(filter);
    };

    void load();
  }, [fetchData, filter]);

  useEffect(() => {
    setFilter(prev => ({
      ...prev,
      page: 1,
      search: debouncedSearch,
    }));
  }, [debouncedSearch]);

  const updateUserStatus = useCallback(async (id: number, action: "block" | "unblock" | "delete" ) => {
    try {
      if (action === "block") {
        await adminBlockUser(id)
      }

      if (action === "unblock") {
        await adminUnblockUser(id)
      }

      if (action === "delete") {
        await adminDeleteUser(id)
      }

      setFilter(prev => ({ ...prev }));

    } catch (error) {
      const myError = error as Error;
      notificationError(myError.message);
    }
  }, [])

  const columns: ColumnsType<Profile> = [
    {
      title: 'Имя',
      dataIndex: 'username',
      key: 'username',
      fixed: filter.sortBy === 'username' ? 'left' : undefined,
      sorter: true,
      sortOrder: filter.sortBy === 'username' ? ( filter.sortOrder === 'asc' ? 'ascend' : 'descend' ) : null
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      fixed: filter.sortBy === 'email' ? 'left' : undefined,
      sorter: true,
      sortOrder: filter.sortBy === 'email' ? ( filter.sortOrder === 'asc' ? 'ascend' : 'descend' ) : null
    },
    {
      title: 'Зарегистрирован',
      dataIndex: 'date',
      key: 'date',
      render: (dateString: Profile['date']) => new Date(dateString).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
    },
    {
      title: 'Статус',
      dataIndex: 'isBlocked',
      key: 'isBlocked',
      render: (isBlocked: Profile['isBlocked']) => (
        <Tag color={isBlocked ? 'red' : 'green'}>
          {isBlocked ? 'Заблокирован' : 'Активен'}
        </Tag>
      ),
    },
    {
      title: 'Роли',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: Profile['roles']) => (
        <>
          {roles.map((role) => {
            let color = 'geekblue';
            if (role === 'ADMIN') color = 'volcano';
            if (role === 'MODERATOR') color = 'gold';
            if (role === 'USER') color = 'blue';

            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      key: 'operation',
      fixed: 'right',
      render: (_, profile) => {

        const items = [
          {
            key: '0',
            label: `Пользовать ${profile.username}`,
            disabled: true,
          },
          {
            type: 'divider',
          },
          {
            label: 'Перейти к профилю',
            icon: <UserOutlined />,
            key: '1',
          },
          {
            label: 'Управление ролями',
            icon: <SafetyCertificateOutlined />,
            key: '2',
          },
          profile.isBlocked ? {
            label:
              <div onClick={e => e.stopPropagation()}>
                <Popconfirm
                  title="Разблокировать пользователя?"
                  okText="Разблокировать"
                  cancelText="Отмена"
                  onConfirm={() => updateUserStatus(profile.id, 'unblock')}
                >
                  <span style={{ color: '#389e0d'}}>Разблокировать</span>
                </Popconfirm>
              </div>,
            icon:  <UnlockOutlined  style={{ color: '#389e0d' }} />,
            key: '3',
          } : null,
          !profile.isBlocked ? {
            label:
              <div onClick={e => e.stopPropagation()}>
                <Popconfirm
                  title="Заблокировать пользователя?"
                  okText="Заблокировать"
                  cancelText="Отмена"
                  onConfirm={() => updateUserStatus(profile.id, 'block')}
                >
                  <span style={{ color: '#ff4d4f'}}>Заблокировать</span>
                </Popconfirm>
              </div>,
            icon: <LockOutlined  style={{ color: '#ff4d4f' }} />,
            key: '3',
          } : null,
          {
            type: 'divider',
          },
          isAdmin ? {
            label: <div onClick={e => e.stopPropagation()}>
              <Popconfirm
                title="Удалить пользователя?"
                okText="Удалить"
                cancelText="Отмена"
                onConfirm={() => updateUserStatus(profile.id, 'delete')}
              >
                <span>Удалить пользователя</span>
              </Popconfirm>
            </div>,
            icon: <DeleteOutlined />,
            key: '4',
            danger: true,
          } : null,
        ].filter(Boolean) as ItemType[];

        return <Dropdown menu={{ items }} placement="bottomRight" arrow  trigger={['click']}>
          <Button type="primary" icon={<MoreOutlined />} variant="filled" color="default" />
        </Dropdown>},
    },
  ];

  const handleTableChange: TableProps<Profile>['onChange'] = (pagination, _, sorter) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    const sortBy: string | undefined = singleSorter.field as string | undefined;

    let sortOrder: 'asc' | 'desc' | undefined;

    switch (singleSorter?.order) {
      case 'ascend':
        sortOrder = 'asc';
        break;
      case 'descend':
        sortOrder = 'desc';
        break;
      default:
        sortOrder = undefined;
    }

    setFilter(prev => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
      sortBy: sortBy,
      sortOrder: sortOrder,
    }));
  };

  return (
    <>
      <Title level={2} style={{ marginTop: 0 }}>
        Пользователи
      </Title>

      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item name="search" label="Поиск по имени или Email">
          <Input />
        </Form.Item>

        {isAdmin &&
          <Form.Item label="Статус блокировки" name="isBlocked">
            <Radio.Group
              value={filter.isBlocked}
              onChange={(e: CheckboxChangeEvent) => {
                setFilter(prev => ({
                  ...prev,
                  page: 1,
                  isBlocked: e.target.value,
                }))
              }}
            >
              <Radio.Button value={undefined}>Все пользователи</Radio.Button>
              <Radio.Button value={false}>Активные</Radio.Button>
              <Radio.Button value={true}>Заблокированные</Radio.Button>
            </Radio.Group>
          </Form.Item>
        }
      </Form>

      {isLoading && (
        <Flex align={'center'} justify={'center'} style={{ margin: '2em 0' }}>
          <Spin size="large" />
        </Flex>
      )}

      {!isLoading && (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{
            current: filter.page,
            pageSize: filter.limit,
            total: total,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
          scroll={{ x: 'max-content' }}
        />
      )}

    </>
  );
};

export default UsersPage;
