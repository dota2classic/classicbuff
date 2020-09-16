import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Table, Tr } from "./LadderRow";
import { observer, useLocalStore } from "mobx-react";
interface Props<T> {
  data: T[];
  renderRow: (t: T) => ReactElement;
  head: Partial<{ [key in keyof T]: ReactNode }>[];
  sort: Partial<{ [key in keyof T]: (t: T) => any }>;
  defaultSort?: keyof T;
  reverse?: boolean;
}
enum SortState {
  ASC,
  DESC
}
export default observer(function<T>(props: Props<T>) {
  const [sortedData, setSortedData] = useState(props.data);
  const [sortKey, setSortKey] = useState<
    | {
        key: string;
        order: SortState;
      }
    | undefined
  >(
    (props.defaultSort && {
      key: props.defaultSort as string,
      order: props.reverse ? SortState.DESC : SortState.ASC
    }) ||
      undefined
  );

  const doSortStuff = () => {
    if (!sortKey) {
      setSortedData(props.data);
      return;
    }

    // @ts-ignore
    const sortFn = props.sort[sortKey.key];

    const newSortedData = [...props.data];

    newSortedData.sort((a, b) => {
      if (sortFn(a) < sortFn(b)) {
        if (sortKey.order === SortState.ASC) return 1;
        else return -1;
      }
      if (sortFn(a) > sortFn(b)) {
        if (sortKey.order === SortState.ASC) return -1;
        else return 0;
      }
      return 0;
    });
    setSortedData(newSortedData);
  };

  useEffect(() => {
    doSortStuff();
  }, [props.data, sortKey]);
  const Row: React.FunctionComponent<T> = props.renderRow;

  return (
    <Table className="compact">
      <thead>
        <Tr>
          {props.head.map(some => {
            return Object.entries(some).map(([key, value]: any) => {
              return (
                <th
                  onClick={() => {
                    // @ts-ignore
                    const sortFn = props.sort[key];

                    if (sortFn) {
                      if (!sortKey || sortKey.key !== key) {
                        setSortKey({
                          key,
                          order: SortState.DESC
                        });
                        console.log("Set desc");
                      } else if (sortKey.key === key) {
                        console.log("Switching to asc or undefined");
                        // switch to next
                        if (sortKey.order === SortState.DESC) {
                          setSortKey({
                            key,
                            order: SortState.ASC
                          });
                        } else {
                          setSortKey(undefined);
                        }
                      }
                    }
                  }}
                >
                  {value} {sortKey?.key === key ? (sortKey?.order === SortState.ASC ? "↓" : "↑") : undefined}
                </th>
              );
            });
          })}
        </Tr>
      </thead>
      <tbody>
        {sortedData.map(it => (
          <Row {...it} />
        ))}
      </tbody>
    </Table>
  );
});
