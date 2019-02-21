#!/usr/bin/env bash

SCRIPTS_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P)
BACKUP_CMD="pg_dump"
RESTORE_CMD="pg_dump"

# Make sure the `.env.sh` exists
if [[ ! -f "${SCRIPTS_PATH}/.env.sh" ]] ; then
    echo 'File ".env.sh" is missing in the scripts directory, aborting.'
    exit
fi

source "${SCRIPTS_PATH}/.env.sh"

DB_BACKUP_PATH="/tmp/${REMOTE_DB_NAME}-db-dump-$(date '+%Y%m%d').sql"

ssh ${REMOTE_SSH_USER}@${REMOTE_SSH_HOST} -p ${REMOTE_SSH_PORT} -i ${REMOTE_SSH_PRIVATE_KEY_PATH} "env PGPASSWORD='${REMOTE_DB_PASSWORD}' ${BACKUP_CMD} -U ${REMOTE_DB_USER} -h ${REMOTE_DB_HOST} -p ${REMOTE_DB_PORT} ${REMOTE_DB_NAME}" > "${DB_BACKUP_PATH}"
env PGPASSWORD=${LOCAL_DB_PASSWORD} psql -U ${LOCAL_DB_USER} -h ${LOCAL_DB_HOST} -p ${LOCAL_DB_PORT} -e ${LOCAL_DB_NAME} -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
env PGPASSWORD=${LOCAL_DB_PASSWORD} psql -U ${LOCAL_DB_USER} -h ${LOCAL_DB_HOST} -p ${LOCAL_DB_PORT} -e ${LOCAL_DB_NAME} < ${DB_BACKUP_PATH}
rm ${DB_BACKUP_PATH}
