/**
 * 运动控制
 * @author Dominic
 */

'use strict'

const rosnodejs = require('rosnodejs');
const Twist = rosnodejs.require('geometry_msgs').msg.Twist;

let cmd_vel;

/**
 * 初始化
 * @param rosNode 宿主node(tr_hmi_node)
 */
function setUpCommand(rosNode) {
    cmd_vel = rosNode.advertise('/cmd_vel', 'geometry_msgs/Twist', {
        queueSize: 1,
        latching: true,
        throttleMs: 0
    });
}

/**
 * 发送 cmd_vel 指令，控制机器人运动
 * @param vx linear speed (m/s)
 * @param vt angular speed (arc/s)
 * @param rosNode 宿主node(tr_hmi_node)
 */
function pubCmdVelMsg(vx, vt, rosNode) {
    if (!rosNode) {
        rosNode = rosnodejs.nh;
        if (!rosNode) {
            console.error('could not get node handler for cmd_vel');
        }
    }
    if (!cmd_vel) {
        setUpCommand(rosNode);
    }

    let msgTwist = new Twist({
        linear: {
            x: vx,
            y: 0,
            z: 0
        },
        angular: {
            x: 0,
            y: 0,
            z: vt
        }
    });

    cmd_vel.publish(msgTwist);
}

module.exports.pubCmdVelMsg = pubCmdVelMsg;