<?php
session_start();
require_once __DIR__ . '/../shared/config/db.php';

// Redirect if already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: index.php');
    exit;
}

$error = '';
$username_val = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username_val = trim($_POST['username'] ?? '');
    $password_val = trim($_POST['password'] ?? '');

    if (empty($username_val) || empty($password_val)) {
        $error = 'Please enter both username and password.';
    } else {
        $db = getDbConnection();
        $stmt = $db->prepare("SELECT * FROM admins WHERE username = :u LIMIT 1");
        $stmt->execute([':u' => $username_val]);
        $admin = $stmt->fetch();

        if ($admin && password_verify($password_val, $admin['password_hash'])) {
            // Update last login
            $update = $db->prepare("UPDATE admins SET last_login = NOW() WHERE id = :id");
            $update->execute([':id' => $admin['id']]);

            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            $_SESSION['admin_name'] = $admin['full_name'] ?? 'Restaurant Manager';

            header('Location: index.php');
            exit;
        } else {
            $error = 'Invalid administrative credentials. Please check and try again.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | Peachy Plate Portal</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎛️</text></svg>">
    <link rel="stylesheet" href="assets/css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .login-wrap {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
        }
        .login-box {
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 25px 60px rgba(0,0,0,0.3);
            width: 100%;
            max-width: 440px;
            padding: 40px;
        }
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .login-logo {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-bottom: 6px;
        }
    </style>
</head>
<body>

<div class="login-wrap">
    <div class="login-box">
        <div class="login-header">
            <div class="login-logo">
                <span style="color: #e11d48;">🍑</span>
                <span>Peachy Plate</span>
                <span style="font-size: 11px; background: #ffe4e6; color: #e11d48; padding: 2px 8px; border-radius: 4px;">CMS</span>
            </div>
            <p style="color: #64748b; font-size: 13.5px;">Restaurant Control Panel &bull; New Delhi</p>
        </div>

        <?php if (!empty($error)): ?>
            <div class="adm-alert adm-alert-error">
                <i class="fa-solid fa-circle-exclamation"></i> <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <!-- Presentation Helper Credentials -->
        <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 12px 14px; margin-bottom: 24px; font-size: 12px; color: #92400E;">
            <div style="font-weight: 700; margin-bottom: 4px;">⚡ Demo Admin Credentials:</div>
            <div>Username: <strong style="font-family: monospace; background: #fff; padding: 1px 6px; border-radius: 4px;">admin</strong></div>
            <div>Password: <strong style="font-family: monospace; background: #fff; padding: 1px 6px; border-radius: 4px;">admin123</strong></div>
        </div>

        <form method="POST" action="login.php">
            <div class="adm-form-group">
                <label for="username">Username or Email</label>
                <input type="text" id="username" name="username" class="adm-form-control" placeholder="admin" value="<?php echo htmlspecialchars($username_val); ?>" required autofocus>
            </div>

            <div class="adm-form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" class="adm-form-control" placeholder="••••••••" required>
            </div>

            <button type="submit" class="adm-btn adm-btn-primary" style="width: 100%; justify-content: center; padding: 13px; margin-top: 10px; font-size: 14px;">
                <i class="fa-solid fa-lock-open"></i> Log In to Dashboard
            </button>
        </form>

        <div style="text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
            <a href="../index.html" style="font-size: 12px; color: #64748b; font-weight: 600;">
                &larr; Return to Client Concept Portal
            </a>
        </div>
    </div>
</div>

</body>
</html>
