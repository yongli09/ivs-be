#!/bin/bash
task_arns=$(aws ecs list-tasks --cluster ivs --query 'taskArns' --output text)
for element in ${task_arns}
do
    aws ecs stop-task --cluster ivs --task ${element}
done
