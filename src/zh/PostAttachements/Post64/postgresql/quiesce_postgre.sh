#!/bin/sh
if [[ $1 == "freeze" ]]
then
        # set log directory
        log="/var/log/vpostgres_backup.log"
        # set and log start date
        today=`date +%Y\/%m\/%d\ %H:%M:%S`
        echo "${today}: Start of creation consistent state" >> ${log}
        # execute freeze command.
        # This command can be modified as per the database command
        cmd="echo \"SELECT pg_start_backup('${today}', true);\" | sudo -i -u postgres psql >> ${log} 2>&1"
        eval ${cmd}
        # set and log end date
        today=`date +%Y\/%m\/%d\ %H:%M:%S`
        echo "${today}: Finished freeze script" >> ${log}
elif [[ $1 == "thaw" ]]
then
        echo "This section is executed when the Snapshot is removed"
        log="/var/log/vpostgres_backup.log"
        # set and log start date
        today=`date +%Y\/%m\/%d\ %H:%M:%S`
        echo "${today}: Release of backup" >> ${log}
        # execute release command
        cmd="echo \"SELECT pg_stop_backup();\" | sudo -i -u postgres psql >> ${log} 2>&1"
        eval ${cmd}
        # set and log end date
        today=`date +%Y\/%m\/%d\ %H:%M:%S`
        echo "${today}: Finished thaw script" >> ${log}
elif [[ $1 == "freezeFail" ]]
then
        echo "This section is executed when the Quiescing Fails."
else
        echo "No argument was provided"
fi