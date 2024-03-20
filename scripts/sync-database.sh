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

echo '--- Backing up production DB ----'
ssh ${REMOTE_SSH_USER}@${REMOTE_SSH_HOST} -p ${REMOTE_SSH_PORT} "env PGPASSWORD='${REMOTE_DB_PASSWORD}' ${BACKUP_CMD} --no-owner -U ${REMOTE_DB_USER} -h ${REMOTE_DB_HOST} -p ${REMOTE_DB_PORT} ${REMOTE_DB_NAME}" > "${DB_BACKUP_PATH}"

echo '------ Dropping local data ------'
env PGPASSWORD=${LOCAL_DB_PASSWORD} psql -U ${LOCAL_DB_USER} -h ${LOCAL_DB_HOST} -p ${LOCAL_DB_PORT} -e ${LOCAL_DB_NAME} -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

echo '--- Restoring backup to local ---'
env PGPASSWORD=${LOCAL_DB_PASSWORD} psql -U ${LOCAL_DB_USER} -h ${LOCAL_DB_HOST} -p ${LOCAL_DB_PORT} -e ${LOCAL_DB_NAME} < ${DB_BACKUP_PATH} > /dev/null

echo '---------- Cleaning up ----------'
rm ${DB_BACKUP_PATH}

echo '------------- Done! -------------'
