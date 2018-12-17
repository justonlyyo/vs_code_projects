# -*- coding: utf-8 -*-
import os
import hashlib
import subprocess
import time


"""自动把style文件转换成css文件"""


class Transform:
    def __init__(self):
        self.data = dict()

    def current_path(self) -> str:
        return os.path.dirname(os.path.realpath(__file__))

    def group_file(self, d: dict, dir_path: str, file_name: str) -> dict:
        """分组文件名"""
        styl_d = d
        if file_name.endswith(".styl"):
            flag = False
            if file_name in styl_d:
                f_p = os.path.join(dir_path, file_name)
                new_md5 = None
                with open(f_p, "rb") as f:
                    new_md5 = hashlib.md5(f.read()).hexdigest()
                    # print(new_md5)
                old_md5 = styl_d[file_name]
                
                if new_md5 is None or old_md5 == new_md5:
                    """无需生成css的情况"""
                    pass
                else:
                    # print(2)
                    styl_d[file_name] = new_md5
                    flag = True
            else:
                f_p = os.path.join(dir_path, file_name)
                new_md5 = None
                with open(f_p, "rb") as f:
                    new_md5 = hashlib.md5(f.read()).hexdigest()
                    # print(new_md5)
                if new_md5 is None:
                    """无需生成css的情况"""
                    pass
                else:
                    # print(4)
                    styl_d[file_name] = new_md5
                    flag = True
            if flag:
                """生成新的css文件"""
                # print(d, new_md5)
                args = ["stylus", file_name]
                r = subprocess.call(args)
                # print(r)
            else:
                pass
        else:
            pass

    def get_file_list(self) -> list:
        """获取文件列表"""
        names = os.listdir(self.current_path())
        data = self.data
        d_path = self.current_path()
        [self.group_file(data, d_path, x) for x in names]
        return names

    @classmethod
    def work(cls):
        t = Transform()
        while 1:
            t.get_file_list()
            time.sleep(1)

if __name__ == "__main__": 
    Transform.work()
    pass
