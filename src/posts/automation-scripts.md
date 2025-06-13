---
title: "Automation Scripts Collection"
date: "2024-12-20"
description: "A collection of useful automation scripts for daily development tasks."
---

# Automation Scripts Collection

This post contains a collection of useful automation scripts that can help streamline your daily development workflow.

## Shell Scripts

Here are some commonly used shell scripts for automation:

### File Organization Script

```bash
#!/bin/bash
# Organize files by extension
for file in *.*; do
    if [ -f "$file" ]; then
        ext="${file##*.}"
        mkdir -p "$ext"
        mv "$file" "$ext/"
    fi
done
```

### Git Automation

```bash
#!/bin/bash
# Quick git commit and push
git add .
git commit -m "$1"
git push origin main
```

## Python Scripts

### Log File Analyzer

```python
import re
from collections import Counter

def analyze_logs(log_file):
    with open(log_file, 'r') as f:
        logs = f.readlines()
    
    # Extract IP addresses
    ips = re.findall(r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b', ''.join(logs))
    
    # Count occurrences
    ip_counts = Counter(ips)
    
    return ip_counts.most_common(10)
```

## Conclusion

These scripts can significantly improve your productivity by automating repetitive tasks. Feel free to modify them according to your specific needs.