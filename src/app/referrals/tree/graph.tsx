import { referralsService } from "@/services/referralsService";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
//import { Tree } from "tree-graph-react";
//import NodeMap from "tree-graph-react/dist/interfaces/NodeMap";
//import "tree-graph-react/dist/tree-graph-react.cjs.development.css";

const Graph = () => {
  return null

  /*const { user } = useAuthStore.getState();
  const [nodes, setNodes] = useState<NodeMap>({});

  useEffect(() => {
    referralsService.getTree().then((r) =>
      setNodes(
        r.items.reduce((a: NodeMap, b, index, arr) => {
          a[b.user_id] = {
            _key: b.user_id,
            father: b.parent_id,
            name: b.display_name,
            sortList: arr
              .filter((dd) => dd.parent_id == b.user_id)
              .map((dd) => dd.user_id),
            contract: b.depth > 1,
            childNum: arr.filter(
              (dd) => dd.path.includes(b.user_id) && dd.user_id != b.user_id
            ).length,
            showCheckbox: false,
            showStatus: false,
          };
          return a;
        }, {} as NodeMap)
      )
    );
  }, [user?.id]);

  return (
    <Tree
      nodes={nodes}
      startId={user?.id || ""}
      disableShortcut
      disabled
    />
  );*/
};

export default Graph;
