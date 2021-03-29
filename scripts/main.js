function logicLasers() {
	Groups.build.each(b => {
		if (b.block.class.getSuperclass() == LogicBlock) {
			b.links.each(l => {
				let linkBuild = Vars.world.tile(l.x, l.y).build;
				
				if (linkBuild != null) {
					let linkAngle = b.angleTo(linkBuild);
					let blockAngle = linkBuild.angleTo(b);
					
					let blockOffset = new Vec2;
					blockOffset.trns(linkAngle, 3 * b.block.size);
					let linkOffset = new Vec2;
					linkOffset.trns(blockAngle, 3 * linkBuild.block.size);
					
					Draw.z(Layer.power);
					Draw.color(Color.valueOf("a794e3"));
					Lines.stroke(1);
					Drawf.laser(b.team, Core.atlas.find("laser"), Core.atlas.find("laser-end"), b.x + blockOffset.x, b.y + blockOffset.y, linkBuild.x + linkOffset.x, linkBuild.y + linkOffset.y, linkAngle, 0.3);
				}
			});
		}
	});
};

logicLaserEffect = new Effect(10, e => {
	logicLasers();
});

Events.run(Trigger.update, () => {logicLaserEffect.at(Vars.player.x, Vars.player.y)});