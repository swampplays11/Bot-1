import { Command, CommandContext, Permission } from './command';
import AutoMod from '../modules/auto-mod/auto-mod';
import Deps from '../utils/deps';
import { getMemberFromMention } from '../utils/command-utils';
import Guilds from '../data/guilds';

export default class MuteCommand implements Command {
    precondition: Permission = 'MUTE_MEMBERS';
    usage = 'mute target_id/mention';
    name = 'mute';
    summary = 'Stop a user from sending messages.';
    cooldown = 3;
    module = 'Auto-mod';
    
    constructor(
        private autoMod = Deps.get<AutoMod>(AutoMod)) {}
    
    execute = async(ctx: CommandContext, targetMention: string, ...args: string[]) => {
        const target = getMemberFromMention(targetMention, ctx.guild);
        
        const reason = args.join(' ') || 'Unspecified';
        await this.autoMod.mute(target, ctx.user, reason);

        await ctx.channel.send(`<@!${target.id}> was muted for \`${reason}\``);
    };
}
