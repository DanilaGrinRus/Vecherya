use strict; use warnings;
my $file = shift @ARGV;
open my $fh, '<', $file or die $!;
local $/; my $s = <$fh>; close $fh;

my $re = qr/if \(!recipes\.length\) \{\s*\n\s*listEl\.innerHTML = '<div style="color: var\(--text-secondary\);">Рецепты не загружены \(rules_mapping\.json\)\.<\/div>';\s*\n\s*return;\s*\n\s*\}/m;

my $replacement = join("\n",
    'if (!recipes.length) {',
    '',
    '            const err = __rulesMappingLoadError',
    '                ? "<div style=\\"margin-top:6px; color: var(--danger); font-size: 12px;\\">" + escapeHtml(__rulesMappingLoadError) + "</div>"',
    '                : "";',
    '',
    '            listEl.innerHTML =',
    '                "<div style=\\"color: var(--text-secondary);\\">Рецепты не загружены (rules_mapping.json).</div>" +',
    '                err +',
    '                "<div style=\\"margin-top:6px; font-size: 12px; color: var(--text-secondary);\\">Проверьте, что файл <b>data/rules_mapping.json</b> закоммичен в репозиторий и доступен в GitHub Pages. Если сайт открыт не с корня (например, /Vecherya/...), файл должен лежать по этому же префиксу.</div>";',
    '',
    '            return;',
    '        }'
);

my $count = ($s =~ s/$re/$replacement/g);

if (!$count) {
    die "Patch failed: target block not found\n";
}

open my $out, '>', $file or die $!;
print $out $s;
close $out;
print "Patched blocks: $count\n";
