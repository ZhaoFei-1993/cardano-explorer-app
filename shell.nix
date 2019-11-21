with import ./nix {};
mkShell {
  buildInputs = [ niv yarn2nix yarn nodejs ];
}
