import mysql from "mysql";
import { sql, db_keys } from "../config";

const pools = mysql.createPoolCluster();
Object.keys(sql).forEach(db_key => pools.add(db_key, sql[db_key as keyof typeof sql]));

export const Query = <T = mysql.OkPacket>(sql: string, db_key: db_keys, values: unknown[] = []) => {
    return new Promise<T>((resolve, reject) => {
        pools.getConnection(db_key, (err, pool) => {
            if (err) return reject(err);

            pool.query(sql, values, (err, results) => {
                if (err) return reject(err);

                resolve(results);
            });
        });
    });
};
